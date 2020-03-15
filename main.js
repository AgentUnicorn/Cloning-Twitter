let textArea = document.getElementById('textArea')
let userImg = document.getElementById('user-img')
    // let userInput = document.getElementById('userInput')
let twitterArray = []
let hashTagArray = []
let id = 0;


const countText = () => {
    let countResult = 140 - textArea.value.length

    if (countResult < 0) {
        document.getElementById('countText').innerHTML = `${countResult} characters left`.fontcolor("red")
    } else
        document.getElementById('countText').innerHTML = `${countResult} characters left`
}

// const signIn = () => {
//     window.open("main.html");
//     let userName = userInput.value
//     debugger
//     document.getElementById('userName').innerHTML = `Hello ${userName}`
// }
textArea.addEventListener('input', countText)

const addTwitter = () => {
    let styleMention = `style="font-weight:bold; color: red; cursor: pointer;"`
    let originalContent = textArea.value
    let arrayContent = originalContent.split(' ')
    hashTagArray = arrayContent.filter((text) => text[0] == '#')

    for (let i = 0; i < arrayContent.length; i++) {
        if (arrayContent[i][0] == '#' || arrayContent[i][0] == '@') {
            arrayContent[i] = `<span onclick="hashTagFilter('${arrayContent[i]}')" ${arrayContent[i][0] == '@' ? styleMention : ''} style="color:blue; cursor: pointer;">${arrayContent[i]}</span>`
        }
    }
    let contentConvert = arrayContent.join(' ')
        // console.log('user image:', userImg.value)
    let twitterStory = {
        id: id,
        userName: 'Hung',
        timeTwitt: moment().startOf('hour').fromNow(),
        content: contentConvert,
        like: false,
        comment: '',
        hashtagText: hashTagArray

    }
    twitterArray.push(twitterStory)
    console.log('this is hastag', twitterStory.hashtagText)
    render(twitterArray)
    id++


}
const toggleLike = (id) => {
    let twitterLikeObj = twitterArray.find((item) => item.id == id)
    twitterLikeObj.like = !twitterLikeObj.like
    render(twitterArray)
}

const addComment = (i) => {
    twitterArray[i].comment = prompt('Enter Your Message')
    render(twitterArray)
}

const deleteTwitt = (originId) => {

    // let deletedObject = twitterArray.find((item) => item.id == originId);
    let retweetList = twitterArray.filter((item) => item.original);

    if (retweetList != null) {
        retweetList = retweetList.filter((item) => item.original.id == originId)
        let retweetIdList = retweetList.map((item) => item.id)

        twitterArray = twitterArray.filter((item) => !retweetIdList.includes(item.id))
    }

    twitterArray = twitterArray.filter((item) => item.id !== originId);


    render(twitterArray)
}

const reTwitt = (originId) => {
    let originTwitt = twitterArray.find((item) => item.id == originId)
    let newTwittContent = prompt('Why you retwitt ?')
    let reTwittObject = {
        id: id,
        userName: 'Hung',
        timeTwitt: moment().startOf('hour').fromNow(),
        content: newTwittContent,
        like: false,
        comment: '',
        original: {
            timeTwitt: originTwitt.timeTwitt,
            id: originId,
            userName: 'Hung',
            content: originTwitt.content,
            // more
        } // original tweet info
    }
    twitterArray.push(reTwittObject)
    render(twitterArray)
    id++
}

const hashTagFilter = (text) => {
    console.log('text', text)
    let a = twitterArray.filter((item) => {
        return item.hashtagText.includes(text);
    })
    render(a)
}

const render = (array) => {
    console.log(array)
    let resultArray = array.map((item, i) => {
        let retwitt // by default will be null
        let comment = `<div>${item.userName} Comment</div><span></span> <p>${item.comment}</p>`
        let imgTwitt = `<div><img src="${item.image}" alt=""></div>`
        if (item.original) { // check if there is a original object in side item (tweet)
            retwitt = `
            <div class="card">
                <div class="card-header">${item.original.userName}<span>${item.original.timeTwitt}</span>
                    <div class="card-body">
                        <p class="card-text">${item.original.content}</p>   
                    </div>
                </div>
            </div>
            `
        }
        let tweet = `
        <div class="card mt-5">
                <div class="card-header">
                    ${item.userName}
                    <span>${item.timeTwitt}</span>
                </div>
            <div class="card-body">
                <p class="card-text">${item.content}</p>
                ${retwitt ? retwitt : ""}
                ${imgTwitt ? imgTwitt : ''}
                <a onclick="toggleLike(${item.id})" class="btn btn-primary">${item.like ? 'UnLike' : 'Like'}</a>
                <a onclick="addComment(${i})" class="btn btn-primary">Comment</a>
                <a onclick="reTwitt(${item.id})" class="btn btn-primary">Retwitt</a>
                <a onclick="deleteTwitt(${item.id})" class="btn btn-primary">Delete</a>
                
            </div>
            ${item.comment ? comment : ''}
        </div>`

        return tweet
    }).join('')

    document.getElementById('twitter-stories').innerHTML = resultArray

}
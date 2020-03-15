let textArea = document.getElementById('textArea')
let userImg = document.getElementById('user-img')
    // let urlObj = "https://api.myjson.com/bins/1gra4q"
    // console.log('url', url)
    // const getAPI = async() => {
    //     let data = await fetch(url)
    //     let result = await data.json()
    //     console.log(result)
    // }
    // getAPI()

const getData = () => {
    let dataArray = JSON.parse(localStorage.getItem('dataTweet'))
    if (dataArray == null) {
        dataArray = []
    }
    return dataArray
}

let twitterArray = getData()
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
let currentName = JSON.parse(localStorage.getItem('data'))
console.log(currentName)

const addTwitter = () => {
    let styleMention = `style="font-weight:bold; color: red; cursor: pointer;"`
    let originalContent = textArea.value
    let arrayContent = originalContent.split(' ')
    hashTagArray = arrayContent.filter((text) => text[0] == '#')

    for (let i = 0; i < arrayContent.length; i++) {
        if (arrayContent[i][0] == '#' || arrayContent[i][0] == '@') {
            arrayContent[i] = `<span onclick="hashTagFilter('${arrayContent[i]}')" ${arrayContent[i][0] == '@' ? styleMention : ''} style="color:blue; cursor: pointer;">${arrayContent[i]}</span>`
        }
        if (arrayContent[i].includes('http')) {
            arrayContent[i] = `<img class="w-100 h-50" src="${arrayContent[i]}" alt="img">`
        }
    }
    let contentConvert = arrayContent.join(' ')
        // console.log('user image:', userImg.value)
    let twitterStory = {
        id: id,
        userName: currentName.userName,
        timeTwitt: moment().startOf('hour').fromNow(),
        content: contentConvert,
        like: false,
        comment: '',
        hashtagText: hashTagArray

    }
    twitterArray.unshift(twitterStory)
    console.log('this is hastag', twitterStory.hashtagText)
    render(twitterArray)
    id++
    document.getElementById('textArea').value = ''


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
    let styleMention = `style="font-weight:bold; color: red; cursor: pointer;"`
        // let originalContent = textArea.value
    let arrayContent = newTwittContent.split(' ')
    hashTagArray = arrayContent.filter((text) => text[0] == '#')

    for (let i = 0; i < arrayContent.length; i++) {
        if (arrayContent[i][0] == '#' || arrayContent[i][0] == '@') {
            arrayContent[i] = `<span onclick="hashTagFilter('${arrayContent[i]}')" ${arrayContent[i][0] == '@' ? styleMention : ''} style="color:blue; cursor: pointer;">${arrayContent[i]}</span>`
        }
        if (arrayContent[i].includes('http')) {
            arrayContent[i] = `<img class="w-100 h-50" src="${arrayContent[i]}" alt="img">`
        }
    }
    let contentConvert = arrayContent.join(' ')
    let reTwittObject = {
        id: id,
        userName: currentName.userName,
        timeTwitt: moment().startOf('hour').fromNow(),
        content: contentConvert,
        like: false,
        comment: '',
        original: {
            timeTwitt: originTwitt.timeTwitt,
            id: originId,
            userName: originTwitt.userName,
            content: originTwitt.content,
            // more
        } // original tweet info
    }
    twitterArray.unshift(reTwittObject)
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
            
                <div class="card-header"><img class="mr-2 rounded-pill" src="img/cat.png" width="50" height="50">
                ${item.original.userName}<span> ${item.original.timeTwitt}</span>
                    <div class="card-body">
                        <p class="card-text">${item.original.content}</p>   
                    </div>
                </div>
            </div>
            `
        }
        let tweet = `
        <div class="card mt-5 w-100"  style="border-color:blue">
            <div class="card-header">
                <img class="mr-2 rounded-pill" src="img/cat.png" width="50" height="50">
                ${item.userName}
                <span>${item.timeTwitt}</span>
            </div>
            <div class="card-body">
                <p class="card-text">${item.content}</p>
                ${retwitt ? retwitt : ""}
                ${imgTwitt ? imgTwitt : ''}
            </div>
            <div class="card-footer">
                <a onclick="toggleLike(${item.id})" class="btn">${item.like ? '<i class="fas fa-heart hoverbtn" style="color:red"></i><span> Like</span>' : '<i class="far fa-heart hoverbtn" style="color:blue"></i><span> Unlike</span>'}</a>
                <a onclick="addComment(${i})" class="btn"><i class="far fa-comment hoverbtn" style="color:blue"></i><span> Comment</span></a>
                <a onclick="reTwitt(${item.id})" class="btn"><i class="fas fa-retweet hoverbtn" style="color:blue"></i><span> Retweet</span></a>
                <a onclick="deleteTwitt(${item.id})" class="btn"><i class="far fa-trash-alt hoverbtn" style="color:red"></i><span> Delete</span></a>   
            </div>
            ${item.comment ? comment : ''}
        </div>`

        return tweet
    }).join('')

    document.getElementById('twitter-stories').innerHTML = resultArray
    document.getElementById('total-twitter').innerHTML = twitterArray.length
    document.getElementById('countText').innerHTML = `140 characters left`
    saveData()

}

const saveData = () => {
    localStorage.setItem('dataTweet', JSON.stringify(twitterArray))
}
render(twitterArray)
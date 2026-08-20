import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const tweetBtn = document.getElementById('tweet-btn')

document.addEventListener('click', function(e){
     if (e.target.dataset.likes){
        handleLikeClick(e.target.dataset.likes)
     }
     else if(e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
     }
     else if(e.target.dataset.replies){
        handleReplyClick(e.target.dataset.replies)  
     }
     else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
     }
})

function handleLikeClick(tweetId){
    
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
        // targetTweetObj.isLiked = false
    }
    else{
        targetTweetObj.likes++
        // targetTweetObj.isLiked = true     
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()        
}
    

function handleRetweetClick(tweetId){
    const targetRetweetObj = tweetsData.filter(function(retweet){
        return retweet.uuid === tweetId
    })[0]

    if(targetRetweetObj.isRetweeted){
        targetRetweetObj.retweets--
    } else {
        targetRetweetObj.retweets++
    }

    targetRetweetObj.isRetweeted = !targetRetweetObj.isRetweeted
    render()
}

function handleReplyClick(replyId){

    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')

}

function handleTweetBtnClick(){
    // console.log(tweetInput.value)
    // console.log('water')

    console.log({
        handle: `@Scrimba`,
        profilePic: `images/scrimbalogo.png`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    })
}
  

function getFeedHtml(){
    let feedHtml = ``
    tweetsData.forEach(function(tweetDetails){
        let likedIconClass = ''
        let sharedIconClass = ''

        if(tweetDetails.isLiked){
            likedIconClass = 'liked'
        }

        if(tweetDetails.isRetweeted){
            sharedIconClass = 'retweeted'
        }

        let repliesHtml = ""

        if (tweetDetails.replies.length > 0){
            tweetDetails.replies.forEach(function(reply){
                repliesHtml += `<div class"tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>

                </div>`
            })
        }
 
        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweetDetails.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweetDetails.handle}</p>
                    <p class="tweet-text">${tweetDetails.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots" data-replies="${tweetDetails.uuid}"></i>
                            ${tweetDetails.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likedIconClass}" data-likes="${tweetDetails.uuid}"></i>
                            ${tweetDetails.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-share-from-square ${sharedIconClass}" data-retweet="${tweetDetails.uuid}"></i>
                            ${tweetDetails.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
        </div>
        <div id="replies-${tweetDetails.uuid}">
            ${repliesHtml}
        </div>`
    })
    return feedHtml;
    console.log(feedHtml)
}


function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
   
}

render()
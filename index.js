import { tweetsData } from './data.js'

const tweetBtn = document.getElementById('tweet-btn')
const tweetInput = document.getElementById('tweet-input')

tweetBtn.addEventListener('click', function(){
    console.log(tweetInput.value)
})

document.addEventListener('click', function(e){
    // console.log(e)
    if (e.target.dataset.likes){
        handleLikeClick(e.target.dataset.likes)
    }
})

function handleLikeClick(tweetId){
    
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
        targetTweetObj.isLiked = false
    }
    else{
        targetTweetObj.likes++
        targetTweetObj.isLiked = true     
    }
    
    render()        
}
    
    
  
function getFeedHtml(){
    let feedHtml = ``
    tweetsData.forEach(function(tweetDetails){
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
                            <i class="fa-solid fa-heart" data-likes="${tweetDetails.uuid}"></i>
                            ${tweetDetails.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-share-from-square" data-retweet="${tweetDetails.uuid}"></i>
                            ${tweetDetails.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
        </div>`
    })
    return feedHtml;
    console.log(feedHtml)
}


function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
   
}

render()
import { tweetsData } from './data.js'

const tweetBtn = document.getElementById('tweet-btn')
const tweetInput = document.getElementById('tweet-input')

tweetBtn.addEventListener('click', function(){
    console.log(tweetInput.value)
})

document.addEventListener('click', function(e){
  
     if (e.target.dataset.likes){
        handleLikeClick(e.target.dataset.likes)
     }else if(e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
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

        if (tweet.replies.length > 0){
            console.log(tweet.uuid)
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
        </div>`
    })
    return feedHtml;
    console.log(feedHtml)
}


function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
   
}

render()
import { tweetsData } from './data.js'

const tweetBtn = document.getElementById('tweet-btn')
const tweetInput = document.getElementById('tweet-input')

tweetBtn.addEventListener('click', function(){
    console.log(tweetInput.value)
})

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
                            ${tweetDetails.replies.length}
                        </span>
                        <span class="tweet-detail">
                            ${tweetDetails.likes}
                        </span>
                        <span class="tweet-detail">
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
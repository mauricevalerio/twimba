import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { tweetsData } from './data.js'

document.addEventListener('click', function (e) {
	if (e.target.dataset.like) {
		handleLikeClick(e.target.dataset.like);
	} else if (e.target.dataset.retweet) {
		handleRetweetClick(e.target.dataset.retweet);
	} else if (e.target.dataset.reply) {
		handleReplyClick(e.target.dataset.reply);
	} else if (e.target.id === "tweet-btn") {
		handleTweetBtnClick();
	} else if (e.target.dataset.addComment) {
		handleAddCommentBtnClick(e.target.dataset.addComment);
	} else if (e.target.dataset.del) {
		handleDeleteTweetClick(e.target.dataset.del)
	} else if (e.target.dataset.commentDel) {
		handleDeleteCommentClick(e.target.dataset.commentDel);
	}
});

function saveToLocalStorage() {
	localStorage.setItem("tweetsData", JSON.stringify(tweetsData))
}

function handleLikeClick(tweetId) {
	const targetTweetObj = tweetsData.find(tweet => tweet.uuid === tweetId);

	if (targetTweetObj.isLiked) {
		targetTweetObj.likes -= 1;
	} else {
		targetTweetObj.likes += 1;
	}
	targetTweetObj.isLiked = !targetTweetObj.isLiked

	saveToLocalStorage();

	renderTweets();
}

function handleRetweetClick(tweetId) {
	const targetTweetObj = tweetsData.find(tweet => tweet.uuid === tweetId);

	if (targetTweetObj.isRetweeted) {
		targetTweetObj.retweets -= 1;
	} else {
		targetTweetObj.retweets += 1;
	}
	targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
	saveToLocalStorage();

	renderTweets();
}

function handleReplyClick(replyId) {
	document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

function handleTweetBtnClick() {
	const tweetInput = document.getElementById('tweet-input')
	if (tweetInput.value) {
		tweetsData.unshift({
			handle: `@Twimba`,
			profilePic: `images/scrimbalogo.png`,
			likes: 0,
			retweets: 0,
			tweetText: tweetInput.value,
			replies: [],
			isLiked: false,
			isRetweeted: false,
			uuid: uuidv4()
		})
		renderTweets();
		tweetInput.value = '';
	}
}

/*data-text-comment - textarea */
/*data-add-comment - add comment button */
function handleAddCommentBtnClick(uuid) {
	const targetAddComment = tweetsData.find(tweet => tweet.uuid === uuid);

	if (document.querySelector(`[data-text-comment="${uuid}"]`).value) {
		targetAddComment.replies.push({
			handle: `@Twimba`,
			profilePic: `images/scrimbalogo.png`,
			tweetText: document.querySelector(`[data-text-comment="${uuid}"]`).value,
			uuid: uuidv4()
		})
		renderTweets();
		saveToLocalStorage();
		handleReplyClick(uuid);//shows comment even after add comment button is clicked
	}
}

function handleDeleteTweetClick(deleteId) {
	const targetDeleteTweet = tweetsData.find(tweet => tweet.uuid === deleteId);

	tweetsData.splice(tweetsData.indexOf(targetDeleteTweet), 1)

	renderTweets();
	saveToLocalStorage();
}

function handleDeleteCommentClick(commentId) {

	const commentList = tweetsData.find(tweet => tweet.replies.find(reply => reply.uuid === commentId)).replies;
	const targetComment = commentList.find(comment => comment.uuid === commentId);

	const tweetUuid = tweetsData.find(tweet => tweet.replies.find(reply => reply.uuid === commentId)).uuid
	//declared to toggle hidden class

	commentList.splice(commentList.indexOf(targetComment), 1);
	renderTweets();
	saveToLocalStorage();
	handleReplyClick(tweetUuid);

}


/* RENDER TWEETS */
function elementFromHtml(html) {

	const template = document.createElement("template");
	template.innerHTML = html.trim();

	return template.content.firstElementChild;
}

function renderReplyCommentBox(uuid) {
	let htmlCommentBox = '';

	htmlCommentBox += `
			<div class="tweet-reply">
				<div class="tweet-inner">
					<img src="images/scrimbalogo.png" class="profile-pic">
					<div>
						<textarea class="textarea-reply" placeholder="Type comment here!" data-text-comment="${uuid}"></textarea>
						<button data-add-comment="${uuid}">Add Comment</button>
					</div>
				</div>
			</div>
			`

	return htmlCommentBox;
}

function renderReplies(tweet) {
	let htmlReplies = '';
	if (tweet.replies.length) {
		tweet.replies.forEach(reply =>
			htmlReplies += `
				<div class="tweet-reply">
					<div class="tweet-inner">
						<img src="${reply.profilePic}" class="profile-pic">
						<div>
							<p class="handle">${reply.handle}</p>
							<p class="reply-text">${reply.tweetText}</p>
						</div>
						<i class="fa-solid fa-trash" data-comment-del="${reply.uuid}"></i>
						
					</div>
				</div>
			`
		)
	}
	return htmlReplies;
}

function renderTweets() {
	const feed = document.getElementById('feed')

	while (feed.firstChild) {
		feed.removeChild(feed.firstChild);
	}

	tweetsData.forEach((tweet) => {

		let likeIconClass = '';
		let retweetIconClass = '';


		if (tweet.isLiked) {
			likeIconClass = 'liked'
		}

		if (tweet.isRetweeted) {
			retweetIconClass = 'retweeted'
		}

		//elementFromHtml trims whitespaces and stores it in a template element
		//appends the template element to the parent feed element

		//for each tweet object create the elements below
		feed.appendChild(
			elementFromHtml(
				`<div class="tweet">
					<div class="tweet-inner">
						<img src="${tweet.profilePic}" class="profile-pic">
						<div>
							<p class="handle">${tweet.handle}</p>
							<p class="tweet-text">${tweet.tweetText}</p>
							<div class="tweet-details">
								<span class="tweet-detail">
									<i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
									${tweet.replies.length}
								</span>
								<span class="tweet-detail">
									<i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
									${tweet.likes}
								</span>
								<span class="tweet-detail">
									<i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
									${tweet.retweets}
								</span>
								<span class="tweet-detail">
									<i class="fa-solid fa-trash" data-del="${tweet.uuid}"></i>
								</span>
							</div>
						</div>
						
						
					</div>
					<div id="replies-${tweet.uuid}" class="hidden">
						${renderReplies(tweet)}
						${renderReplyCommentBox(tweet.uuid)}
					</div>
				</div>`
			)
		)
	})
}

renderTweets()
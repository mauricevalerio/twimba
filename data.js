if (!JSON.parse(localStorage.getItem("tweetsData"))) {
    localStorage.setItem("tweetsData", JSON.stringify([
        {
            handle: `@TrollBot66756542 💎`,
            profilePic: `images/troll.jpg`,
            likes: 27,
            retweets: 10,
            tweetText: `Buy Bitcoin, ETH Make 💰💰💰 low low prices.
            Guaranteed return on investment. HMU DMs open!!`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: '4b161eee-c0f5-4545-9c4b-8562944223ee',
        },
        {
            handle: `@Elon ✅`,
            profilePic: `images/musk.png`,
            likes: 6500,
            retweets: 234,
            tweetText: `I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀`,
            replies: [
                {
                    handle: `@TomCruise ✅`,
                    profilePic: `images/tcruise.png`,
                    tweetText: `Yes! Sign me up! 😎🛩`,
                    uuid: '720e5bbe-aec7-4597-9151-5fdabbd20c1e'
                },
                {
                    handle: `@ChuckNorris ✅`,
                    profilePic: `images/chucknorris.jpeg`,
                    tweetText: `I went last year😴`,
                    uuid: '678bb5a8-222c-4635-9d69-eb07fe0540a7'
                },
            ],
            isLiked: false,
            isRetweeted: false,
            uuid: '3c23454ee-c0f5-9g9g-9c4b-77835tgs2',
        },
        {
            handle: `@NoobCoder12`,
            profilePic: `images/flower.png`,
            likes: 10,
            retweets: 3,
            tweetText: `Are you a coder if you only know HTML?`,
            replies: [
                {
                    handle: `@StackOverflower ☣️`,
                    profilePic: `images/overflow.png`,
                    tweetText: `No. Onviosuly not. Go get a job in McDonald's.`,
                    uuid: 'e33fd4b1-8713-4e41-b667-263ca754da26'
                },
                {
                    handle: `@YummyCoder64`,
                    profilePic: `images/love.png`,
                    tweetText: `You are wonderful just as you are! ❤️`,
                    uuid: 'ab3e7182-97b1-446a-9ff7-b05743ede735'
                },
            ],
            isLiked: false,
            isRetweeted: false,
            uuid: '8hy671sff-c0f5-4545-9c4b-1237gyys45',
        },
    ]))

}

export const tweetsData = JSON.parse(localStorage.getItem("tweetsData"));
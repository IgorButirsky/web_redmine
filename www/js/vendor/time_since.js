function timeSince(timestamp) {
    date = new Date(timestamp * 1000);
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);

    if (interval > 0)
        return interval + ' years ago';

    interval = Math.floor(seconds / 2592000);
    if (interval > 0)
        return interval + ' months ago';

    interval = Math.floor(seconds / 86400);
    if (interval > 0)
        return interval + ' days ago';

    interval = Math.floor(seconds / 3600);
    if (interval > 0)
        return interval + ' hours ago';

    interval = Math.floor(seconds / 60);
    if (interval > 0)
        return interval + ' minutes ago';

    if (seconds < 5)
        return 'Just now';

    return Math.floor(seconds) + ' seconds ago';
}

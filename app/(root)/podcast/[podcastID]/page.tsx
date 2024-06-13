const PodcastDetails = ({params}: {params: {podcastID: string}}) => {
    return (
        <html>
            <h1>
               Podcast for {params.podcastID}
            </h1>
            
        </html>
    );
}

export default PodcastDetails;
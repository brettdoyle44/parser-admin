import Feed from 'rss-to-json';

export default function rssParser(rssLink) {
  Feed.load(`${rssLink}`, async function(err, rss) {
    try {
      const episodes = rss.items.map(episode => {
        const episodesData = {
          title: episode.title,
          subtitle: episode.itunes_subtitle,
          description: episode.itunes_summary,
          pubDate: episode.pubDate,
          length: episode.enclosures[0].length,
          audioUrl: episode.enclosures[0].url
        };
        return episodesData;
      });
      const data = {
        title: rss.title,
        description: rss.description,
        image: rss.image,
        episodes: [...episodes]
      };
      return data;
    } catch (err) {
      console.error(err);
    }
  });
}

import { API } from 'aws-amplify';
import React, { useState } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
const Feed = require('rss-to-json');

export default function NewNote(props) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    Feed.load(`${content}`, async function(err, rss) {
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
        createPodcast(data);
      } catch (err) {
        console.error(err);
      }
    });
  }

  function createPodcast(podcast) {
    return API.post('podcasts', '/podcasts', {
      body: podcast
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="content">
          <FormControl
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </FormGroup>
        <Button
          block
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </Button>
      </form>
    </div>
  );
}

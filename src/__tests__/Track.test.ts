import Track from '../Track';
import TrackMetadata from '../TrackMetadata';

test('create a valid track', () => {
  const trackMetadata: TrackMetadata = {
    artists: 'Track artists',
    title: 'Track title',
    duration: 250,
    picture: null,
  };
  const track = new Track('path/to/audioFile', trackMetadata);
  expect(track.id).toBe('cGF0aC90by9hdWRpb0ZpbGU=');
  expect(track.filePath).toBe('path/to/audioFile');
  expect(track.metadata).toStrictEqual(trackMetadata);
});

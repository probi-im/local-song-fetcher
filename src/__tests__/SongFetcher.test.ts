import { resolve } from 'path';
import { readFile } from 'fs/promises';
import SongFetcher from '../SongFetcher';
import Track from '../Track';

test('fetch valid folder', async () => {
  const firstTrackPath = resolve(__dirname, './tracks/sample-3s.mp3');
  const firstExpectedTrack: Track = {
    id: Buffer.from(firstTrackPath).toString('base64'),
    filePath: firstTrackPath,
    metadata: {
      artists: '',
      title: '',
      duration: 3.239183673469388,
      picture: null,
    },
  };
  const secondTrackPath = resolve(__dirname, './tracks/sample-6s.mp3');
  const secondExpectedTrack: Track = {
    id: Buffer.from(secondTrackPath).toString('base64'),
    filePath: secondTrackPath,
    metadata: {
      artists: '',
      title: '',
      duration: 6.426122448979592,
      picture: null,
    },
  };
  const songFetcher = new SongFetcher();
  const sampleTracksPath = resolve(__dirname, 'tracks/');
  const tracks = await songFetcher.fetchFolder(sampleTracksPath);
  expect(tracks.length).toBe(2);
  expect(tracks[0]).toEqual(firstExpectedTrack);
  expect(tracks[1]).toEqual(secondExpectedTrack);
});

test('fetch invalid folder path', async () => {
  const songFetcher = new SongFetcher();
  const sampleTracksPath = resolve(__dirname, 'track/');
  expect.assertions(1);
  try {
    await songFetcher.fetchFolder(sampleTracksPath);
  } catch (error) {
    expect(error.code).toBe('ENOENT');
  }
});

test('get audio data uri', async () => {
  const songFetcher = new SongFetcher();
  const sampleTrackPath = resolve(__dirname, './tracks/sample-3s.mp3');
  const data = await readFile(sampleTrackPath);
  const audioDataUri = await songFetcher.getAudioDataUri(sampleTrackPath);
  expect(audioDataUri).toBe(`data:audio/mp3;base64,${data.toString('base64')}`);
});

test('get audio data uri wrong track path', async () => {
  const songFetcher = new SongFetcher();
  const sampleTrackPath = resolve(__dirname, './tracks/invalidfile.txt');
  try {
    await songFetcher.getAudioDataUri(sampleTrackPath);
  } catch (error) {
    expect(error.name).toBe('Error');
  }
});

test('get audio data uri missing track path', async () => {
  const songFetcher = new SongFetcher();
  const sampleTrackPath = resolve(__dirname, './tracks/invalidddfile.txt');
  try {
    await songFetcher.getAudioDataUri(sampleTrackPath);
  } catch (error) {
    expect(error.code).toBe('ENOENT');
  }
});

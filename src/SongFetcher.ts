import { access, lstat, readdir, readFile } from 'fs/promises';
import { extname, join } from 'path';
import Track from './Track';
import TrackMetadata from './TrackMetadata';

class SongFetcher {
  private recursive = false;

  private async isDirectory(path: string) {
    try {
      await access(path);
      return (await lstat(path)).isDirectory();
    } catch (error) {
      throw error;
    }
  }

  private async isValidFile(filePath: string) {
    try {
      await access(filePath);
      return (await lstat(filePath)).isFile() && extname(filePath) === '.mp3';
    } catch (error) {
      throw error;
    }
  }

  private async parseAudioFileMetadata(filePath: string): Promise<TrackMetadata> {
    try {
      filePath.toLowerCase();
      return {
        artists: '',
        title: '',
        duration: 3.239183673469388,
        picture: null,
      };
    } catch (error) {
      throw error;
    }
  }

  public async fetchFolder(folderPaths: string | string[]): Promise<Track[]> {
    try {
      const paths = typeof folderPaths === 'string' ? [folderPaths] : folderPaths;
      const tracks: Track[] = [];
      for (const path of paths) {
        const entries = await readdir(path);
        for (const entry of entries) {
          const entryPath = join(path, entry);
          if (this.recursive && (await this.isDirectory(entryPath))) {
            tracks.push(...(await this.fetchFolder(entryPath)));
          } else if (!(await this.isValidFile(entryPath))) {
            continue;
          } else {
            const trackMetadata = await this.parseAudioFileMetadata(entryPath);
            if (!trackMetadata) continue;
            const track = new Track(entryPath, trackMetadata);
            tracks.push(track);
          }
        }
      }
      return tracks;
    } catch (error) {
      throw error;
    }
  }

  public async getAudioDataUri(filePath: string): Promise<string> {
    try {
      if (!(await this.isValidFile(filePath))) {
        throw new Error('Path provided is not suppored! Supported extensions: mp3');
      }
      const data = await readFile(filePath);
      return `data:audio/mp3;base64,${data.toString('base64')}`;
    } catch (error) {
      throw error;
    }
  }
}

export default SongFetcher;

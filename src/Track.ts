import TrackMetadata from "./TrackMetadata";

export default class Track {
  id: string;
  filePath: string;
  metadata: TrackMetadata;

  constructor(filePath: string, metadata: TrackMetadata) {
    this.id = Buffer.from(filePath).toString('base64');
    this.filePath = filePath;
    this.metadata = metadata;
  }
}

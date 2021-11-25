import { AdminMetadata } from '../metadatas';

export class MetadataStorageHost {
  private admins = new Array<AdminMetadata>();

  addAdminMetadata(metadata: AdminMetadata) {
    this.admins.push(metadata);
  }

  getAdminsMetadata(): AdminMetadata[] {
    return this.admins;
  }
}

const globalRef = global as any;
export const MetadataStorage: MetadataStorageHost =
  globalRef.AdminMetadataStorage ||
  (globalRef.AdminMetadataStorage = new MetadataStorageHost());

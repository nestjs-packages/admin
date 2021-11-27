import { MetadataStorage } from '../storages';

export function getAdminSections() {
  const admins = MetadataStorage.getAdminsMetadata();

  const sections = [...new Set(admins.map((v) => v.section))];

  return sections.map((name) => ({
    name,
    admins: admins.filter((v) => v.section === name),
  }));
}

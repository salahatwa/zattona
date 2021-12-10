export * from './category.service';
export * from './configurations.services';
export * from './link.service';
export * from './post.service';
export * from './sheet.service';

import { CategoryService } from "./category.service";
import { ConfigrationsService } from './configurations.services';
import { LinkService } from './link.service';
import { PostService } from './post.service';
import { SheetService } from './sheet.service';
import { TagService } from './tag.service';

export const APIS = [CategoryService, PostService, TagService, LinkService,SheetService, ConfigrationsService];

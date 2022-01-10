export * from './category.service';
export * from './configurations.services';
export * from './link.service';
export * from './post.service';
export * from './sheet.service';
export * from './user.service';
export * from './tools.service';
export * from './oauth.services';

import { CategoryService } from "./category.service";
import { ConfigrationsService } from './configurations.services';
import { LinkService } from './link.service';
import { OauthService } from './oauth.services';
import { PostService } from './post.service';
import { SheetService } from './sheet.service';
import { TagService } from './tag.service';
import { ToolsService } from './tools.service';
import { UserService } from './user.service';

export const APIS = [OauthService,CategoryService, PostService, TagService, LinkService, SheetService, ConfigrationsService, UserService,ToolsService];

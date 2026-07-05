export { authService } from './auth.service';
export { usersService } from './users.service';
export { dealsService } from './deals.service';
export { documentsService } from './documents.service';
export { notificationsService } from './notifications.service';
export { chatService } from './chat.service';
export { escrowService } from './escrow.service';

// Re-export types
export type { UpdateUserRequest } from './users.service';
export type { Deal, CreateDealRequest, UpdateDealRequest } from './deals.service';
export type { Document, CreateDocumentRequest } from './documents.service';
export type { Notification } from './notifications.service';
export type { Message, Conversation, CreateMessageRequest } from './chat.service';
export type { EscrowAccount, CreateEscrowRequest, ReleaseEscrowRequest } from './escrow.service';

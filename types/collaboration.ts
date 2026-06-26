export interface CollaborationUser {
  name: string;
  color: string;
}

export interface OnlineUser extends CollaborationUser {
  clientId: number;
  isCurrentUser: boolean;
}

// Example usage of shared DTOs and types in the web app
import { 
  type ChatDto, 
  type CreateChatDto, 
  type ApiResponse,
  createSuccessResponse,
  createErrorResponse,
  CHAT_LIMITS 
} from '@repo/shared';

// Example: Creating a chat
export const createChat = async (chatData: CreateChatDto): Promise<ApiResponse<ChatDto>> => {
  try {
    // Validate title length
    if (chatData.title.length > CHAT_LIMITS.MAX_TITLE_LENGTH) {
      return createErrorResponse('Title too long');
    }

    // Make API call (pseudo code)
    const response = await fetch('/api/chats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(chatData),
    });

    if (!response.ok) {
      return createErrorResponse('Failed to create chat');
    }

    const chat: ChatDto = await response.json();
    return createSuccessResponse(chat, 'Chat created successfully');
  } catch (error) {
    return createErrorResponse('Network error occurred');
  }
};

// Example: Type-safe component props
interface ChatListProps {
  chats: ChatDto[];
  onCreateChat: (data: CreateChatDto) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ chats, onCreateChat }) => {
  // Component implementation would go here
  return null;
};
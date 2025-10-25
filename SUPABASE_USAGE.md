# Supabase RTK Query Usage Guide

## 🎯 Quick Start

All Supabase features are now available through RTK Query hooks. They provide automatic caching, refetching, and state management.

## 📚 Available Hooks

### 1. User Management

```tsx
import { useSupabaseUser } from '@/hooks/useSupabase';

function MyComponent() {
  const { userId, supabaseUser, loading } = useSupabaseUser();
  
  if (loading) return <Text>Loading...</Text>;
  if (!userId) return <Text>Please log in</Text>;
  
  return <Text>Welcome {supabaseUser?.username}!</Text>;
}
```

### 2. Favorites

```tsx
import { 
  useGetFavoritesQuery,
  useCheckIsFavoriteQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation 
} from '@/services/supabaseApi';
import { useSupabaseUser } from '@/hooks/useSupabase';

function FavoritesScreen() {
  const { userId } = useSupabaseUser();
  
  // Get all favorites
  const { data: favorites, isLoading } = useGetFavoritesQuery(userId!, {
    skip: !userId
  });
  
  return (
    <View>
      {favorites?.map(fav => (
        <Text key={fav.id}>{fav.movie_title}</Text>
      ))}
    </View>
  );
}

function MovieCard({ movieId, movieType, title, poster }) {
  const { userId } = useSupabaseUser();
  
  // Check if favorited
  const { data: isFavorited } = useCheckIsFavoriteQuery(
    { userId: userId!, movieId, movieType },
    { skip: !userId }
  );
  
  // Mutations
  const [addToFavorites] = useAddToFavoritesMutation();
  const [removeFromFavorites] = useRemoveFromFavoritesMutation();
  
  const toggleFavorite = async () => {
    if (!userId) return;
    
    if (isFavorited) {
      await removeFromFavorites({ userId, movieId, movieType });
    } else {
      await addToFavorites({
        userId,
        movieId,
        movieType,
        movieTitle: title,
        moviePoster: poster
      });
    }
  };
  
  return (
    <TouchableOpacity onPress={toggleFavorite}>
      <Icon name={isFavorited ? 'heart' : 'heart-outline'} />
    </TouchableOpacity>
  );
}
```

### 3. Watchlist

```tsx
import {
  useGetWatchlistQuery,
  useCheckIsInWatchlistQuery,
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation
} from '@/services/supabaseApi';

function WatchlistScreen() {
  const { userId } = useSupabaseUser();
  const { data: watchlist, isLoading } = useGetWatchlistQuery(userId!, {
    skip: !userId
  });
  
  return (
    <FlatList
      data={watchlist}
      renderItem={({ item }) => <MovieCard movie={item} />}
    />
  );
}

function AddToWatchlistButton({ movieId, movieType, title, poster }) {
  const { userId } = useSupabaseUser();
  const { data: isInWatchlist } = useCheckIsInWatchlistQuery(
    { userId: userId!, movieId, movieType },
    { skip: !userId }
  );
  
  const [addToWatchlist] = useAddToWatchlistMutation();
  const [removeFromWatchlist] = useRemoveFromWatchlistMutation();
  
  const toggle = async () => {
    if (!userId) return;
    
    if (isInWatchlist) {
      await removeFromWatchlist({ userId, movieId, movieType });
    } else {
      await addToWatchlist({
        userId,
        movieId,
        movieType,
        movieTitle: title,
        moviePoster: poster
      });
    }
  };
  
  return (
    <Button onPress={toggle}>
      {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </Button>
  );
}
```

### 4. Ratings

```tsx
import {
  useGetRatingQuery,
  useSetRatingMutation,
  useDeleteRatingMutation
} from '@/services/supabaseApi';

function RatingComponent({ movieId, movieType }) {
  const { userId } = useSupabaseUser();
  
  const { data: ratingData } = useGetRatingQuery(
    { userId: userId!, movieId, movieType },
    { skip: !userId }
  );
  
  const [setRating] = useSetRatingMutation();
  const [deleteRating] = useDeleteRatingMutation();
  
  const handleRate = async (rating: number) => {
    if (!userId) return;
    
    await setRating({
      userId,
      movieId,
      movieType,
      rating
    });
  };
  
  const handleRemove = async () => {
    if (!userId) return;
    await deleteRating({ userId, movieId, movieType });
  };
  
  return (
    <View>
      <Text>Your Rating: {ratingData?.rating || 'Not rated'}</Text>
      {[1, 2, 3, 4, 5].map(star => (
        <TouchableOpacity key={star} onPress={() => handleRate(star)}>
          <Icon 
            name={star <= (ratingData?.rating || 0) ? 'star' : 'star-outline'} 
          />
        </TouchableOpacity>
      ))}
      {ratingData && (
        <Button onPress={handleRemove}>Remove Rating</Button>
      )}
    </View>
  );
}
```

### 5. Comments

```tsx
import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation
} from '@/services/supabaseApi';

function CommentsSection({ movieId, movieType }) {
  const { userId } = useSupabaseUser();
  const [comment, setComment] = useState('');
  
  const { data: comments, isLoading } = useGetCommentsQuery({
    movieId,
    movieType
  });
  
  const [addComment] = useAddCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  
  const handlePost = async () => {
    if (!userId || !comment.trim()) return;
    
    await addComment({
      userId,
      movieId,
      movieType,
      comment: comment.trim()
    });
    
    setComment('');
  };
  
  const handleEdit = async (commentId: string, newText: string) => {
    await updateComment({ commentId, comment: newText });
  };
  
  const handleDelete = async (commentId: string) => {
    await deleteComment(commentId);
  };
  
  return (
    <View>
      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder="Write a comment..."
      />
      <Button onPress={handlePost}>Post Comment</Button>
      
      {comments?.map(c => (
        <View key={c.id}>
          <Text>{c.users?.username}: {c.comment}</Text>
          {c.user_id === userId && (
            <>
              <Button onPress={() => handleEdit(c.id, 'New text')}>Edit</Button>
              <Button onPress={() => handleDelete(c.id)}>Delete</Button>
            </>
          )}
        </View>
      ))}
    </View>
  );
}
```

### 6. Watch History

```tsx
import {
  useGetWatchHistoryQuery,
  useUpdateWatchHistoryMutation
} from '@/services/supabaseApi';

function ContinueWatchingRow() {
  const { userId } = useSupabaseUser();
  const { data: history } = useGetWatchHistoryQuery(userId!, {
    skip: !userId
  });
  
  // Filter items with progress < 100%
  const continueWatching = history?.filter(item => item.progress < 100);
  
  return (
    <ScrollView horizontal>
      {continueWatching?.map(item => (
        <MovieCard key={item.id} movie={item} progress={item.progress} />
      ))}
    </ScrollView>
  );
}

function VideoPlayer({ movieId, movieType, title, poster }) {
  const { userId } = useSupabaseUser();
  const [updateHistory] = useUpdateWatchHistoryMutation();
  
  const handleProgress = async (progress: number) => {
    if (!userId) return;
    
    await updateHistory({
      userId,
      movieId,
      movieType,
      progress,
      movieTitle: title,
      moviePoster: poster
    });
  };
  
  return (
    <Video
      onProgress={(data) => {
        const percent = (data.currentTime / data.duration) * 100;
        handleProgress(Math.round(percent));
      }}
    />
  );
}
```

## 🎨 Benefits of RTK Query

1. **Automatic Caching** - Data is cached and reused across components
2. **Auto Refetching** - Data refreshes when needed
3. **Loading States** - Built-in `isLoading`, `isFetching` states
4. **Error Handling** - Built-in error states
5. **Optimistic Updates** - UI updates immediately
6. **Tag Invalidation** - Related queries auto-refresh

## 💡 Pro Tips

### Skip Queries When User Not Logged In

```tsx
const { data } = useGetFavoritesQuery(userId!, {
  skip: !userId  // Don't run query if no userId
});
```

### Handle Loading States

```tsx
const { data, isLoading, isFetching, error } = useGetFavoritesQuery(userId!);

if (isLoading) return <Skeleton />;
if (error) return <ErrorMessage />;
if (!data) return null;
```

### Optimistic Updates

```tsx
const [addToFavorites, { isLoading }] = useAddToFavoritesMutation();

// Button shows loading state automatically
<Button disabled={isLoading} onPress={handleAdd}>
  {isLoading ? 'Adding...' : 'Add to Favorites'}
</Button>
```

### Manual Refetch

```tsx
const { data, refetch } = useGetFavoritesQuery(userId!);

<Button onPress={() => refetch()}>Refresh</Button>
```

## 🔥 Common Patterns

### Toggle Button with Loading State

```tsx
function FavoriteButton({ movieId, movieType, title, poster }) {
  const { userId } = useSupabaseUser();
  const { data: isFavorited } = useCheckIsFavoriteQuery(
    { userId: userId!, movieId, movieType },
    { skip: !userId }
  );
  
  const [add, { isLoading: isAdding }] = useAddToFavoritesMutation();
  const [remove, { isLoading: isRemoving }] = useRemoveFromFavoritesMutation();
  
  const isLoading = isAdding || isRemoving;
  
  const toggle = () => {
    if (!userId || isLoading) return;
    
    if (isFavorited) {
      remove({ userId, movieId, movieType });
    } else {
      add({ userId, movieId, movieType, movieTitle: title, moviePoster: poster });
    }
  };
  
  return (
    <TouchableOpacity onPress={toggle} disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Icon name={isFavorited ? 'heart' : 'heart-outline'} />
      )}
    </TouchableOpacity>
  );
}
```

That's it! You now have a fully functional Supabase integration with RTK Query! 🎉

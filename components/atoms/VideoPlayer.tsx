import React, { useCallback, useRef, useState } from "react";
import { BackHandler, Dimensions, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

interface Props {
  // The URL for the iframe src
  videoEmbedUrl: string;
  // Optional custom height, defaults to a 16:9 aspect ratio
  height?: number;
  // Optional callback for when non-video content is detected
  onNonVideoContent?: () => void;
  // Optional fallback component to show when content is not a video
  fallbackComponent?: React.ReactNode;
}

const IframeVideoPlayer: React.FC<Props> = ({
  videoEmbedUrl,
  height,
  onNonVideoContent,
  fallbackComponent,
}) => {
  // Get the screen width to make the player responsive
  const screenWidth = Dimensions.get("window").width;
  // Calculate height for 16:9 aspect ratio if no custom height is provided
  const calculatedHeight = height || (screenWidth * 9) / 16;

  // State to track if we're showing the fallback component
  const [showFallback, setShowFallback] = useState(false);
  // Ref to the WebView
  const webViewRef = useRef<WebView>(null);
  // Ref to track if we've already detected non-video content
  const nonVideoDetected = useRef(false);

  // Function to extract the domain from a URL
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch (e) {
      return "";
    }
  };

  // Get the original domain to compare against
  const originalDomain = getDomain(videoEmbedUrl);

  // Handle navigation state changes
  const handleNavigationStateChange = useCallback(
    (navState: { url: any; loading: any }) => {
      const { url, loading } = navState;

      // Only check when not loading to avoid false positives during redirects
      if (loading) return;

      // Check if the domain has changed significantly
      const currentDomain = getDomain(url);

      // If we've navigated away from the original domain and haven't already detected non-video content
      if (
        currentDomain &&
        currentDomain !== originalDomain &&
        !nonVideoDetected.current
      ) {
        console.log("Navigation to different domain detected:", currentDomain);
        nonVideoDetected.current = true;

        // Call the callback if provided
        if (onNonVideoContent) {
          onNonVideoContent();
        } else {
          // Default behavior: show fallback component
          setShowFallback(true);
        }
      }
    },
    [originalDomain, onNonVideoContent]
  );

  // Handle errors
  const handleError = useCallback((syntheticEvent: { nativeEvent: any }) => {
    const { nativeEvent } = syntheticEvent;
    console.warn("WebView error: ", nativeEvent);

    // Show fallback on error
    if (!nonVideoDetected.current) {
      nonVideoDetected.current = true;
      setShowFallback(true);
    }
  }, []);

  // Handle hardware back button press to go back in WebView history
  const handleBackPress = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true; // Prevent default back button behavior
    }
    return false; // Use default back button behavior
  }, []);

  // Register back handler
  React.useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => {
      subscription.remove();
    };
  }, [handleBackPress]);
  const injectedJavaScript = `
    (function() {
      // Check if there's a video element on the page
      const hasVideo = document.querySelector('video') !== null;
      
      // Check for common video player containers
      const hasVideoPlayer = 
        document.querySelector('.jwplayer') !== null ||
        document.querySelector('.video-js') !== null ||
        document.querySelector('[id*="player"]') !== null ||
        document.querySelector('[class*="player"]') !== null;
      
      // If no video content is detected, send a message to React Native
      if (!hasVideo && !hasVideoPlayer) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'NO_VIDEO_DETECTED',
          url: window.location.href
        }));
      }
      
      true; // Required for WebView evaluation
    })();
  `;

  // Handle messages from WebView
  const handleMessage = useCallback(
    (event: { nativeEvent: { data: string } }) => {
      try {
        const data = JSON.parse(event.nativeEvent.data);

        if (data.type === "NO_VIDEO_DETECTED" && !nonVideoDetected.current) {
          console.log("No video content detected via JavaScript injection");
          nonVideoDetected.current = true;

          if (onNonVideoContent) {
            onNonVideoContent();
          } else {
            setShowFallback(true);
          }
        }
      } catch (e) {
        // Ignore parsing errors
      }
    },
    [onNonVideoContent]
  );

  // If we should show the fallback component
  if (showFallback && fallbackComponent) {
    return (
      <View style={[styles.container, { height: calculatedHeight }]}>
        {fallbackComponent}
      </View>
    );
  }

  return (
    <View style={[styles.container, { height: calculatedHeight }]}>
      <WebView
        ref={webViewRef}
        source={{ uri: videoEmbedUrl }}
        style={{ flex: 1 }}
        // These props are crucial for a good video experience
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        // Prevents the webview from bouncing
        bounces={false}
        // Good for responsive embeds
        scalesPageToFit={false}
        // For security, you can specify allowed origins
        originWhitelist={["*"]}
        // Set the user agent to a desktop one to avoid mobile site redirects
        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        // Navigation and error handlers
        onNavigationStateChange={handleNavigationStateChange}
        onError={handleError}
        // JavaScript injection for content detection
        injectedJavaScript={injectedJavaScript}
        onMessage={handleMessage}
        // Start with a loading indicator
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            {/* You can add a loading spinner here */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "black",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IframeVideoPlayer;

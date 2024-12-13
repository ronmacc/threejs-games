import mediapipe as mp 
import cv2 

mp_drawing = mp.solutions.drawing_utils # this helps render the landmarks
mp_hands = mp.solutions.hands

cap = cv2.VideoCapture(0)
# set up your camera settings
cap.set(3,1920)
cap.set(4,1080)

# something with the hands.. detector
with mp_hands.Hands(min_detection_confidence=0.5, min_tracking_confidence=0.5) as hands:

    # opens the camera while program is running.. 
    while cap.isOpened():
        re, frame = cap.read()
        if not re:
            print("Failed to grab frame")
            break

        # start the hand detection
        # convert the image to RGB
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        # flip image
        image = cv2.flip(image, 1)
        image.flags.writeable = False

        # process the image for hand landmarks
        results = hands.process(image)
        image.flags.writeable = True

        # recolor back the image to RGB for openCV visualization
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        if results.multi_hand_landmarks:
            for hand_landkmarks in results.multi_hand_landmarks:
                h, w, _ = image.shape
                x, y = hand_landkmarks.landmark[9].x*w, hand_landkmarks.landmark[9].y*h
                x1, y1 = hand_landkmarks.landmark[12].x*w, hand_landkmarks.landmark[12].y*h

                cv2.circle(image, (int(x), int(y)), 10, (0, 255, 0), -1)
                cv2.circle(image, (int(x1), int(y1)), 10, (0, 0, 255), -1)

                if y1 > y:
                    hand_status = "CLOSED"
                else:
                    hand_status = "OPEN"
                cv2.putText(image, hand_status, (50,80), 0, 1.5, (0, 0, 255), 2)



                # selected_landmarks = [hand_landkmarks.landmark[12], hand_landkmarks.landmark[9]]

                # # draw custom circles on landmark 12 and 9
                # for idx, landmark in enumerate(selected_landmarks):
                #     h, w, _ = image.shape
                #     cx, cy = int(landmark.x * w), int(landmark.y * h)

                #     color = (0,255,0) if idx == 0 else (0,0,255)
                #     cv2.circle(image, (cx,cy), 10, color, cv2.FILLED)



        cv2.imshow('img',image)
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()
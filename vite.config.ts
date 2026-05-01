name: Build Android APK
on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - run: npm install
      - run: npm run build
      
      - name: DEBUG - Check dist folder
        run: |
          echo "=== 1. DIST MEIN KYA HAI ==="
          ls -la dist/
          echo "=== 2. INDEX.HTML KE ANDAR KYA HAI ==="
          cat dist/index.html
          echo "=== 3. ASSETS FOLDER ==="
          ls -la dist/assets/
      
      - run: npm install @capacitor/core@5 @capacitor/cli@5 @capacitor/android@5
      - run: npx cap init "1DollarApp" "com.onedollar.app" --web-dir=dist
      - run: npx cap add android
      
      - name: FORCE COPY - Sabse important step
        run: |
          npx cap copy android
          echo "=== 4. ANDROID MEIN COPY HUA YA NAHI ==="
          ls -la android/app/src/main/assets/public/

      - name: Build APK
        run: |
          cd android
          chmod +x ./gradlew
          ./gradlew assembleDebug

      - uses: actions/upload-artifact@v4
        with:
          name: 1Dollar-App-FINAL
          path: android/app/build/outputs/apk/debug/app-debug.apk

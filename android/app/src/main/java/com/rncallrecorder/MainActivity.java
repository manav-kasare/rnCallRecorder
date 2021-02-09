package com.rncallrecorder;

import com.facebook.react.ReactActivity;
import androidx.annotation.NonNull;
import io.wazo.callkeep.RNCallKeepModule;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "rnCallRecorder";
  }

   @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
      super.onRequestPermissionsResult(requestCode, permissions, grantResults);
      switch (requestCode) {
          case RNCallKeepModule.REQUEST_READ_PHONE_STATE:
              RNCallKeepModule.onRequestPermissionsResult(requestCode, permissions, grantResults);
              break;
      }
  }
}

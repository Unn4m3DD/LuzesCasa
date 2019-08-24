package com.luzescasa;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void connect(View v) throws MalformedURLException, IOException {
        int id = 0;
        switch (v.getId()) {
            case (R.id.button1):
                id = 0;
                break;
            case (R.id.button2):
                id = 1;
                break;
            case (R.id.button3):
                id = 2;
                break;
            case (R.id.button4):
                id = 3;
                break;
            case (R.id.button5):
                id = 4;
                break;
        }
        try {
            String[] ips = {"", "", "", ""};
            if (id == 0) {
                for (int i = 1; i < 4; i++) {
                    URL url = new URL(ips[i] + "/on");
                    HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                    urlConnection.disconnect();

                }
            } else if (id == 4) {
                for (int i = 1; i < 4; i++) {
                    URL url = new URL(ips[i] + "/off");
                    HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                    urlConnection.disconnect();

                }
            } else {
                URL url = new URL(ips[id] + "/off");
                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.disconnect();
            }
        } catch (Exception e) {

        }
    }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
})
export class RightSidebarComponent implements OnInit {
  // Declare properties for the video elements
  player1Video!: HTMLVideoElement;
  player2Video!: HTMLVideoElement;

  constructor() {}

  ngOnInit(): void {
    // Get the video elements by their IDs
    this.player1Video = document.getElementById(
      'player1Video'
    ) as HTMLVideoElement;
    this.player2Video = document.getElementById(
      'player2Video'
    ) as HTMLVideoElement;

    // Start capturing webcam video
    this.startWebcamCapture();
  }
  startGame() {
    throw new Error('Method not implemented.');
  }

  // Function to start capturing the webcam video stream
  async startWebcamCapture() {
    try {
      // Get the user media devices (webcam)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      // Set the video sources
      this.player1Video.srcObject = stream;
      this.player2Video.srcObject = stream;
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  }
}

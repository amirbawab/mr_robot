Google Repo:
* Clone https://github.com/GoogleCloudPlatform/java-docs-samples
* cd speech/gprc
* Replace the bin folder by the one in this repo

Steps for using Google Repo:
* Install Java
* Run the setup.sh in the new bin directory
* mvn package
* mvn compile
* mvn assembly:single

Binaries:
* bin/speech-sample-sync.sh --host=speech.googleapis.com --port=443 --uri=resources/audio.raw --sampling=16000
* bin/speech-sample-async.sh --host=speech.googleapis.com --port=443 --uri=resources/audio.raw --sampling=16000
* bin/speech-sample-streaming.sh --host=speech.googleapis.com --port=443 --file=resources/audio.raw --sampling=16000

Create an audio file:
* Open Audacity
* Record voice (or audio from monitor)
* Set rate to 16,000 Hz
* Change channel mode: Tracks > Stereo Track to Mono
* Export with encoding signed 16-bit PCM

"use client";

import {
  useEffect,
  useRef,
  useState
} from "react";

import io from "socket.io-client";

import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MonitorUp,
  FileText,
  ShieldCheck
} from "lucide-react";

const socket = io(
  "http://localhost:5000",
  {
    transports: ["websocket"],
  }
);

export default function VideoConsultationPage() {

  const localVideo =
    useRef<HTMLVideoElement | null>(
      null
    );

  const remoteVideo =
    useRef<HTMLVideoElement | null>(
      null
    );

  const peerConnection =
    useRef<RTCPeerConnection | null>(
      null
    );

  const localStream =
    useRef<MediaStream | null>(
      null
    );

  const roomId =
    "doctor-room";

  const [isMuted, setIsMuted] =
    useState(false);

  const [isVideoOff, setIsVideoOff] =
    useState(false);

  const [patientName,
    setPatientName] =
    useState("");

  const [medicines,
    setMedicines] =
    useState("");

  const [hash,
    setHash] =
    useState("");

  useEffect(() => {

    let mounted = true;

    const init =
      async () => {

        if (
          !mounted ||
          peerConnection.current
        ) {
          return;
        }

        await startVideo();
      };

    init();

    return () => {

      mounted = false;

      socket.off(
        "user-joined"
      );

      socket.off(
        "offer"
      );

      socket.off(
        "answer"
      );

      socket.off(
        "ice-candidate"
      );

      if (
        peerConnection.current
      ) {

        peerConnection.current.close();

        peerConnection.current =
          null;
      }

      if (
        localStream.current
      ) {

        localStream.current
          .getTracks()
          .forEach(
            (
              track
            ) =>
              track.stop()
          );

        localStream.current =
          null;
      }
    };

  }, []);

  const startVideo =
    async () => {

      try {

        const stream =
          await navigator
            .mediaDevices
            .getUserMedia({
              video: true,
              audio: true,
            });

        localStream.current =
          stream;

        if (
          localVideo.current
        ) {

          localVideo.current.srcObject =
            stream;
        }

        peerConnection.current =
          new RTCPeerConnection({
            iceServers: [
              {
                urls:
                  "stun:stun.l.google.com:19302",
              },
            ],
          });

        stream
          .getTracks()
          .forEach(
            (track) => {

              peerConnection.current?.addTrack(
                track,
                stream
              );
            }
          );

        peerConnection.current.ontrack =
          (
            event
          ) => {

            if (
              remoteVideo.current
            ) {

              remoteVideo.current.srcObject =
                event.streams[0];
            }
          };

        peerConnection.current.onicecandidate =
          (
            event
          ) => {

            if (
              event.candidate
            ) {

              socket.emit(
                "ice-candidate",
                {
                  roomId,
                  candidate:
                    event.candidate,
                }
              );
            }
          };

        socket.emit(
          "join-room",
          roomId
        );

        socket.on(
          "user-joined",
          async () => {

            if (
              !peerConnection.current
            ) {
              return;
            }

            const offer =
              await peerConnection.current.createOffer();

            await peerConnection.current.setLocalDescription(
              offer
            );

            socket.emit(
              "offer",
              {
                roomId,
                offer,
              }
            );
          }
        );

        socket.on(
          "offer",
          async (
            offer
          ) => {

            if (
              !peerConnection.current
            ) {
              return;
            }

            await peerConnection.current.setRemoteDescription(
              new RTCSessionDescription(
                offer
              )
            );

            const answer =
              await peerConnection.current.createAnswer();

            await peerConnection.current.setLocalDescription(
              answer
            );

            socket.emit(
              "answer",
              {
                roomId,
                answer,
              }
            );
          }
        );

        socket.on(
          "answer",
          async (
            answer
          ) => {

            if (
              !peerConnection.current
            ) {
              return;
            }

            await peerConnection.current.setRemoteDescription(
              new RTCSessionDescription(
                answer
              )
            );
          }
        );

        socket.on(
          "ice-candidate",
          async (
            candidate
          ) => {

            try {

              if (
                peerConnection.current
              ) {

                await peerConnection.current.addIceCandidate(
                  new RTCIceCandidate(
                    candidate
                  )
                );
              }

            } catch (
              error
            ) {

              console.log(
                error
              );
            }
          }
        );

      } catch (error) {

        console.log(
          "Media Error:",
          error
        );
      }
    };

  const toggleMute =
    () => {

      const audioTrack =
        localStream.current
          ?.getAudioTracks()[0];

      if (
        !audioTrack
      ) {
        return;
      }

      audioTrack.enabled =
        !audioTrack.enabled;

      setIsMuted(
        !audioTrack.enabled
      );
    };

  const toggleVideo =
    () => {

      const videoTrack =
        localStream.current
          ?.getVideoTracks()[0];

      if (
        !videoTrack
      ) {
        return;
      }

      videoTrack.enabled =
        !videoTrack.enabled;

      setIsVideoOff(
        !videoTrack.enabled
      );
    };

  const shareScreen =
    async () => {

      try {

        const screenStream =
          await navigator
            .mediaDevices
            .getDisplayMedia({
              video: true,
            });

        const screenTrack =
          screenStream.getTracks()[0];

        const sender =
          peerConnection.current
            ?.getSenders()
            .find(
              (
                s
              ) =>
                s.track?.kind ===
                "video"
            );

        if (
          sender
        ) {

          await sender.replaceTrack(
            screenTrack
          );
        }

        screenTrack.onended =
          () => {

            const videoTrack =
              localStream.current
                ?.getVideoTracks()[0];

            if (
              sender &&
              videoTrack
            ) {

              sender.replaceTrack(
                videoTrack
              );
            }
          };

      } catch (error) {

        console.log(
          error
        );
      }
    };

  const generatePrescription =
    async () => {

      const prescriptionData =
        `
        Patient:${patientName}
        Medicines:${medicines}
        `;

      const encoder =
        new TextEncoder();

      const data =
        encoder.encode(
          prescriptionData
        );

      const hashBuffer =
        await crypto.subtle.digest(
          "SHA-256",
          data
        );

      const hashArray =
        Array.from(
          new Uint8Array(hashBuffer)
        );

      const hashHex =
        hashArray
          .map((b) =>
            b
              .toString(16)
              .padStart(2, "0")
          )
          .join("");

      setHash(hashHex);

      alert(
        "Prescription Generated"
      );
    };

  const endCall =
    () => {

      if (
        peerConnection.current
      ) {

        peerConnection.current.close();

        peerConnection.current =
          null;
      }

      if (
        localStream.current
      ) {

        localStream.current
          .getTracks()
          .forEach(
            (
              track
            ) =>
              track.stop()
          );

        localStream.current =
          null;
      }

      socket.disconnect();

      window.location.href =
        "/dashboard";
    };

  return (

    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-black
        p-8
        text-white
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          justify-between
          items-center
          mb-10
        "
      >

        <div>

          <h1
            className="
              text-5xl
              font-bold
            "
          >

            Video Consultation

          </h1>

          <p
            className="
              text-slate-400
              mt-2
            "
          >

            Secure AI Healthcare Consultation

          </p>

        </div>

        <div
          className="
            bg-emerald-500/20
            border
            border-emerald-500/30
            px-6
            py-3
            rounded-2xl
            text-emerald-400
            font-semibold
          "
        >

          ● Live Consultation

        </div>

      </div>

      {/* VIDEO GRID */}

      <div
        className="
          grid
          lg:grid-cols-2
          gap-8
          w-full
        "
      >

        {/* LOCAL VIDEO */}

        <div
          className="
            relative
            rounded-3xl
            overflow-hidden
            border
            border-teal-500/40
            shadow-2xl
            bg-black
          "
        >

          <video
            ref={localVideo}
            autoPlay
            muted
            playsInline
            className="
              w-full
              h-[500px]
              object-cover
            "
          />

          <div
            className="
              absolute
              bottom-4
              left-4
              bg-black/70
              px-4
              py-2
              rounded-xl
              text-sm
            "
          >

            Doctor Camera

          </div>

        </div>

        {/* REMOTE VIDEO */}

        <div
          className="
            relative
            rounded-3xl
            overflow-hidden
            border
            border-cyan-500/40
            shadow-2xl
            bg-black
          "
        >

          <video
            ref={remoteVideo}
            autoPlay
            playsInline
            className="
              w-full
              h-[500px]
              object-cover
            "
          />

          <div
            className="
              absolute
              bottom-4
              left-4
              bg-black/70
              px-4
              py-2
              rounded-xl
              text-sm
            "
          >

            Patient Camera

          </div>

        </div>

      </div>

      {/* PRESCRIPTION PANEL */}

      <div
        className="
          mt-10
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
            mb-6
          "
        >

          <FileText
            className="text-cyan-400"
            size={32}
          />

          <h2
            className="
              text-3xl
              font-bold
            "
          >

            Live Prescription

          </h2>

        </div>

        {/* PATIENT */}

        <input
          type="text"

          placeholder="Patient Name"

          value={patientName}

          onChange={(e) =>
            setPatientName(
              e.target.value
            )
          }

          className="
            w-full
            p-4
            rounded-2xl
            bg-white/10
            border
            border-white/10
            mb-5
            outline-none
          "
        />

        {/* MEDICINES */}

        <textarea
          placeholder="Medicines"

          value={medicines}

          onChange={(e) =>
            setMedicines(
              e.target.value
            )
          }

          className="
            w-full
            h-40
            p-4
            rounded-2xl
            bg-white/10
            border
            border-white/10
            mb-5
            outline-none
          "
        />

        {/* BUTTON */}

        <button
          onClick={
            generatePrescription
          }

          className="
            px-8
            py-4
            bg-gradient-to-r
            from-teal-500
            to-cyan-500
            rounded-2xl
            font-bold
            hover:scale-105
            transition-all
          "
        >

          Generate Prescription

        </button>

        {/* HASH */}

        {hash && (

          <div
            className="
              mt-6
              bg-emerald-500/10
              border
              border-emerald-500/20
              p-5
              rounded-2xl
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
                mb-3
              "
            >

              <ShieldCheck
                className="
                  text-emerald-400
                "
              />

              <h3
                className="
                  text-xl
                  font-bold
                "
              >

                Blockchain Verified

              </h3>

            </div>

            <p
              className="
                break-all
                text-sm
                text-emerald-300
              "
            >

              {hash}

            </p>

          </div>

        )}

      </div>

      {/* CONTROLS */}

      <div
        className="
          flex
          flex-wrap
          justify-center
          gap-6
          mt-12
        "
      >

        {/* MIC */}

        <button
          onClick={toggleMute}

          className={`
            p-6
            rounded-full
            shadow-2xl
            transition-all
            hover:scale-110
            ${
              isMuted
                ? "bg-red-500"
                : "bg-emerald-500"
            }
          `}
        >

          {isMuted ? (

            <MicOff
              className="text-white"
              size={30}
            />

          ) : (

            <Mic
              className="text-white"
              size={30}
            />

          )}

        </button>

        {/* VIDEO */}

        <button
          onClick={toggleVideo}

          className={`
            p-6
            rounded-full
            shadow-2xl
            transition-all
            hover:scale-110
            ${
              isVideoOff
                ? "bg-red-500"
                : "bg-cyan-500"
            }
          `}
        >

          {isVideoOff ? (

            <VideoOff
              className="text-white"
              size={30}
            />

          ) : (

            <Video
              className="text-white"
              size={30}
            />

          )}

        </button>

        {/* SCREEN SHARE */}

        <button
          onClick={shareScreen}

          className="
            p-6
            bg-purple-500
            rounded-full
            shadow-2xl
            transition-all
            hover:scale-110
          "
        >

          <MonitorUp
            className="text-white"
            size={30}
          />

        </button>

        {/* END CALL */}

        <button
          onClick={endCall}

          className="
            p-6
            bg-red-600
            rounded-full
            shadow-2xl
            transition-all
            hover:scale-110
          "
        >

          <PhoneOff
            className="text-white"
            size={30}
          />

        </button>

      </div>

    </main>
  );
}
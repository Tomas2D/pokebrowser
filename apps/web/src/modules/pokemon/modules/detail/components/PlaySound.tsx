import { useEffect, useRef, useState } from "react";
import { VolumeMuteFilled, VolumeUpFilled } from "@carbon/icons-react";
import styled from "styled-components";
import { ButtonComponents } from "@module/ui/components/Button";
import { getPokemonAudioLink } from "@module/pokemon/utils";

interface PlaySoundProps {
  id: number;
}

export function PlaySound({ id }: PlaySoundProps) {
  const [isPlaying, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isProcessing = useRef<boolean>(false);

  useEffect(() => {
    const src = getPokemonAudioLink(id);
    const audio = new Audio(src);

    audio.load();

    const handler = () => setPlaying(false);
    audio.addEventListener("ended", handler);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener("ended", handler);
    };
  }, [id]);

  const handleClick = () => {
    if (!audioRef?.current || isProcessing.current) {
      return;
    }

    isProcessing.current = true;

    if (!isPlaying) {
      audioRef
        .current!.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
        .finally(() => {
          isProcessing.current = false;
        });
    } else {
      audioRef.current!.pause();
      audioRef.current!.currentTime = 0;
      isProcessing.current = false;
      setPlaying(false);
    }
  };

  const Icon = isPlaying ? VolumeMuteFilled : VolumeUpFilled;
  return (
    <StyledButton
      onClick={handleClick}
      type={"button"}
      data-cy={`${isPlaying ? "stop" : "play"}-sound`}
    >
      <Icon size={48 as any} />
    </StyledButton>
  );
}

const StyledButton = styled(ButtonComponents.empty)``;

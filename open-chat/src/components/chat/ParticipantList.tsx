import { ParticipantItem } from './ParticipantItem';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { gossipClientAtom, participantAtom } from '../../store/atoms/chat';
import { useAtom, useAtomValue } from 'jotai';

export function ParticipantList() {
  const client = useAtomValue(gossipClientAtom);
  const [participants, setParticipants] = useAtom(participantAtom);

  useEffect(() => {
    console.log('getParticipants');
    client?.getParticipants().then((result) => {
      console.log('result', result);
      if (result.data) {
        setParticipants(result.data);
      }
    });
  }, []);
  return (
    <>
      {participants.map((participant) => (
        <ParticipantItem key={nanoid()} participant={participant} />
      ))}
    </>
  );
}

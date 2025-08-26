'use client';
import { cn } from '@/lib/utils';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LayoutList, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from '@/components/end_call_button';
import { Loader2Icon } from 'lucide-react';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const Meeting_room = () => {
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [show_participant, setShow_participant] = useState(false); // Default to hidden on mobile
  const search_params = useSearchParams();
  const is_personal_room = !!search_params.get('personal');
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2Icon className="animate-spin size-8" />
      </div>
    );
  }

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white bg-red-500">
      <div className="flex flex-col h-full w-full items-center justify-center">
        <div className="flex w-full max-w-[1000px] md:max-w-[800px] sm:max-w-[90%]">
          <CallLayout />
        </div>
        {/* Participants list as a side panel or modal on mobile */}
        <div
          className={cn(
            'w-full md:w-[300px] bg-slate-800 p-2 rounded-sm overflow-y-auto',
            {
              'hidden md:block': !show_participant, // Hide on mobile by default, show on md+ when toggled
              'block': show_participant, // Show on mobile when toggled
            }
          )}
        >
          <CallParticipantsList onClose={() => setShow_participant(false)} />
        </div>
      </div>

      {/* Responsive bottom controls */}
      <div className="fixed bottom-0 w-full flex flex-col md:flex-row items-center justify-center gap-3 p-4 bg-gray-900 bg-opacity-90">
        <CallControls />

        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-full hover:bg-slate-600 p-2 md:p-3">
            <LayoutList size={20} className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-slate-500 bg-slate-600 text-white w-48">
            {['Grid', 'Speaker-left', 'Speaker-right'].map((item, ind) => (
              <div
                key={ind}
                className="cursor-pointer"
                onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
              >
                <DropdownMenuItem className="bg-transparent">{item}</DropdownMenuItem>
                {ind !== 2 && <DropdownMenuSeparator className="border border-gray-500" />}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        <button
          onClick={() => setShow_participant(!show_participant)}
          className="cursor-pointer hover:bg-slate-600 p-2 md:p-3 rounded-full"
        >
          <Users size={20} className="text-white" />
        </button>

        {!is_personal_room && <EndCallButton />}
      </div>
    </section>
  );
};

export default Meeting_room;
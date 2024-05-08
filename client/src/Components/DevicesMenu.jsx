import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import "../Styles/DeviceMenu.css";

import {ChevronDownIcon} from "@chakra-ui/icons";

const getLabelName = (id,obj) => {
  const ans = obj?.filter(ele => ele.deviceId === id);
  return ans[0]?.label.slice(0,40);
}
export const MicMenu = ({mics,selectedMicId,setSelectedMicId}) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {selectedMicId ? getLabelName(selectedMicId,mics) : "Microphone"}
      </MenuButton>
      <MenuList>
        {mics?.map((mic,index) => <MenuItem value={mic} key={index+1} onClick={() => setSelectedMicId(mic?.deviceId)} className="menu-list"> {mic?.label}
        </MenuItem>)}
      </MenuList>
    </Menu>
  );
};

export const CameraMenu = ({webcams ,selectedCamId,setSelectedCamId}) => {
  return (
    <Menu >
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {selectedCamId ? getLabelName(selectedCamId,webcams) : "WebCam"}
      </MenuButton>
      <MenuList id="menu-list">
        {webcams?.map((cam,index) => <MenuItem value={cam} key={index+1} onClick={() => setSelectedCamId(cam.deviceId)}>{cam?.label}</MenuItem>)}
      </MenuList>
    </Menu>
  )
}

export const SpeakerMenu = ({speakers,selectedSpeaker,setSelectedSpeaker}) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
        {selectedSpeaker?.slice(0,40)  || "Speaker"}
      </MenuButton>
      <MenuList >
        {speakers?.map((speaker,index) => <MenuItem value={speaker} key={index} onClick={() => setSelectedSpeaker(speaker.label)}>
          {speaker?.label}</MenuItem>)}
      </MenuList>
    </Menu>
  )
}

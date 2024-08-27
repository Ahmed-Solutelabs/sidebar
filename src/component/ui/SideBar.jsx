"use client";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import SpeakerCard from "./SpeakerCard";
import { data } from "../../util/data";
import useDebounce from "../../util/hook/useDebounce";

const SideBar = ({ open, onClose }) => {
  const [allListOfSpeaker, setAllListOfSpeaker] = useState(structuredClone(data));
  const [speakerData, setSpeakerData] = useState([...allListOfSpeaker]);
  const [selectedSpeaker, setSelectedSpeaker] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search with debounced input
  const handleSearch = useDebounce((term) => {
    const filteredData = allListOfSpeaker.filter((speaker) =>
      speaker.name.toLowerCase().includes(term.toLowerCase().trim())
    );
    setSpeakerData(filteredData); // Update the filtered speaker list
  }, 500); // Delay the search by 500ms

  // Update search term and trigger the debounced search
  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    handleSearch(value); // Debounce the search callback
  };

  // Handle speaker selection toggle
  const selectHandler = (speakerId) => {
    const selectedSpeaker = allListOfSpeaker.find(
      (element) => element.id === speakerId
    );
    selectedSpeaker.isSelected = !selectedSpeaker.isSelected; // Toggle selection status
    setSpeakerData([...speakerData]); // Update the speaker list
    setAllListOfSpeaker([...allListOfSpeaker]); // Maintain the full speaker list
    setSelectedSpeaker(allListOfSpeaker.filter((speaker) => speaker.isSelected)); // Add to selected speakers
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col bg-white shadow-xl justify-between rounded-l-2xl">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between p-4 bg-gray-200 rounded-tl-2xl">
                    <div>Add Speaker</div>
                    <button onClick={onClose}>X</button>
                  </div>
                  <div className="flex border border-gray-200 rounded mx-2 mb-2 gap-2 p-2">
                    <MagnifyingGlassIcon className="w-6 aspect-square text-orange-500" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="flex-grow outline-none"
                      onChange={handleChange}
                      value={searchTerm}
                    />
                  </div>
                </div>
                <div className="flex-grow overflow-y-auto p-2 flex flex-col gap-2">
                  {speakerData.map((speaker) => (
                    <SpeakerCard
                      key={speaker.id}
                      speakerDetails={speaker}
                      selectHandler={selectHandler}
                    />
                  ))}
                </div>
                <div className="border-t border-gray-400 flex  justify-between px-2 py-4 w-full items-center">
                  <div className="flex gap-2">
                    <button
                      className="bg-orange-500 rounded px-4 py-2 text-white disabled:bg-gray-400"
                      disabled={selectedSpeaker.length === 0}
                    >
                      Add
                    </button>
                    <button
                      className="bg-orange-200 rounded px-4 py-2 text-orange-500"
                      onClick={() => {
                        const deepCopy = JSON.parse(JSON.stringify(data));
                        setSelectedSpeaker([]);
                        setAllListOfSpeaker([...deepCopy]);
                        setSearchTerm("");
                        setSpeakerData([...deepCopy]);
                        console.log(allListOfSpeaker);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                  <p className="text-orange-500 cursor-pointer">
                    Create a Speaker
                  </p>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SideBar;

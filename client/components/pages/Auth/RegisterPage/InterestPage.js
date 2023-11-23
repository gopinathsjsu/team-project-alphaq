/* eslint-disable quote-props */
/* eslint-disable indent */
import React, { useState } from 'react';

// ! Improve the import statements
import adventureIcon from '../../../../assets/icons/adventure.svg';
import artIcon from '../../../../assets/icons/art.svg';
import photoIcon from '../../../../assets/icons/camera.svg';
import scifiIcon from '../../../../assets/icons/controller.svg';
import beautyIcon from '../../../../assets/icons/cosmetics.svg';
import danceIcon from '../../../../assets/icons/dance.svg';
import othersIcon from '../../../../assets/icons/direction.svg';
import fashionIcon from '../../../../assets/icons/dress.svg';
import tradingIcon from '../../../../assets/icons/exchange-rate.svg';
import fitnessIcon from '../../../../assets/icons/exercise.svg';
import foodIcon from '../../../../assets/icons/fast-food.svg';
import sportIcon from '../../../../assets/icons/football-players.svg';
import careerIcon from '../../../../assets/icons/goal.svg';
import techIcon from '../../../../assets/icons/innovation.svg';
import businessIcon from '../../../../assets/icons/manager.svg';
import musicIcon from '../../../../assets/icons/music.svg';
import bookIcon from '../../../../assets/icons/reading.svg';
import travelIcon from '../../../../assets/icons/travel.svg';
import entertainmentIcon from '../../../../assets/icons/videocamera.svg';
import writingIcon from '../../../../assets/icons/writing.svg';
import { secureLocalStorage } from '../../../../utils/secureLocalStorage';

const intersetMap = {
  Business: businessIcon,
  Dance: danceIcon,
  Entertainment: entertainmentIcon,
  Fashion: fashionIcon,
  Food: foodIcon,
  Fitness: fitnessIcon,
  Sports: sportIcon,
  Technology: techIcon,
  Travel: travelIcon,
  'Art & Crafts': artIcon,
  Books: bookIcon,
  Career: careerIcon,
  Beauty: beautyIcon,
  Trading: tradingIcon,
  Adventure: adventureIcon,
  Music: musicIcon,
  Photography: photoIcon,
  'Sci-Fi & Games': scifiIcon,
  Writing: writingIcon,
  Others: othersIcon,
};

export default function InterestPage() {
  const [interestState, setInterestState] = useState(
    Object.keys(intersetMap).map((key) => ({
      id: key,
      name: key,
      select: false,
    })),
  );
  const signUpProfileData = secureLocalStorage.getItem('signUpProfile');

  const handleSelectionChange = (el) => {
    setInterestState(
      interestState.map((records) => {
        if (records.id === el.id) {
          return { ...records, select: !records.select };
        }
        return records;
      }),
    );
  };

  const onSubmit = () => signUpProfileData;

  return (
    <div className="container relative mx-auto category-width">
      <div className="p-8 sm:p-0 flex flex-row flex-wrap justify-center items-center">
        {interestState.map((el) => (
          <div
            className="p-4 m-2 text-center rounded-lg icon-class"
            key="test"
            onClick={() => handleSelectionChange(el)}
            onKeyDown={() => handleSelectionChange(el)}
          >
            <div>
              <img
                src={intersetMap[el.name]}
                className="imgIcon cursor-pointer"
                alt="category_name"
              />
            </div>
            <div className="text-black">{el.name}</div>

            {el.select ? (
              <div className="overlay2">
                <i className="fas fa-check" />
              </div>
            ) : (
              <div className="overlay cursor-pointer" />
            )}
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center">
        <button
          className="px-12 font-semibold hover:bg-semibeta py-4 bg-beta rounded-lg text-white"
          onClick={onSubmit}
          type="button"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}

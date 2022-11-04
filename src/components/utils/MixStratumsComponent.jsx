import { Card, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';

const MixStratumsComponent = ({ firstArr, secondArr }) => {
  const [stepFiveArr, setStepFiveArr] = useState(
    mixStratums(firstArr, secondArr)
  );

  /**
   * Handles the input values
   * @function
   * @param {event} e - the onChange event
   * @ return {void} updates the component state
   */

  function handleStepFiveInput(e) {
    const { name, value } = e.target;
    const selectedInput = stepFiveArr.find(e => e.id === name);
    const selectedIdx = stepFiveArr.indexOf(selectedInput);
    setStepFiveArr(
      stepFiveArr.map((input, i) => {
        if (i === selectedIdx) {
          input.value = value;
          return input;
        } else {
          return input;
        }
      })
    );
  }
  /**
   * Mixes two stratums arrays
   * @function
   * @param {array} arrOne, arrTwo - The arrays of stratums to be mixed
   * returns {array} - The array of mixed stratums
   */
  function mixStratums(arrOne, arrTwo) {
    const mixedStratums = [];
    if (arrTwo.length === 0) {
      return arrOne.map(stratum => {
        return {
          label: `${stratum.nombre} `,
          id: `${stratum.nombre}-id`,
          value: 0,
        };
      });
    }
    for (let firstStratum of arrOne) {
      for (let secondStratum of arrTwo) {
        const scheme = {
          label: `${firstStratum.nombre} / ${secondStratum.nombre}`,
          id: `${firstStratum.nombre} / ${secondStratum.nombre}`,
          value: 0,
        };
        mixedStratums.push(scheme);
      }
    }
    return mixedStratums;
  }
  return (
    <Card sx={{ minWidth: '300px' }}>
      <Stack>
        {stepFiveArr.map(item => {
          return (
            <TextField
              sx={{ margin: '1rem' }}
              label={item.label}
              type="number"
              key={item.id}
              value={item.value}
              onChange={handleStepFiveInput}
              name={item.id}
            />
          );
        })}
      </Stack>
    </Card>
  );
};
export default MixStratumsComponent;

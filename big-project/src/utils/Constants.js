export const TWELVE_TONE_DROPDOWN_OPTIONS = [...Array(12).keys()].map(val => {
  return {
    value: parseInt(val),
    label: parseInt(val),
  };
});

export const TWELVE_TONE_TO_NOTE_MAPPING = ['c', '_d', 'd', '_e', 'e', 'f', '^f', 'g', '_a', 'a', '_b', 'b']

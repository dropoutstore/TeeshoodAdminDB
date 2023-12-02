import { Button, ColorPicker, Popover } from '@mantine/core';

type Props = {
  title: string;
  color: string;
  setColor: (color: string) => void;
};

export function ColorPickerComponent({ color, setColor, title }: Props) {
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button
          className="p-0 text-left"
          variant="white"
          rightIcon={
            <Button
              size="xs"
              className="border-solid border border-black"
              style={{ backgroundColor: color }}
            />
          }
        >
          {title}
        </Button>
      </Popover.Target>
      <Popover.Dropdown classNames={{}}>
        <ColorPicker
          value={color}
          onChange={setColor}
          format="hex"
          className="w-full"
        />
      </Popover.Dropdown>
    </Popover>
  );
}

import { useMediaQuery } from '@mantine/hooks';
import DesignArea from './UI/Center';
import { TopEditor } from './UI/TopEdit';
import LeftMenu from './UI/leftMenu/LeftMenu';
import useCMIHooks from './hooks';

export function CMI() {
  const CMIHooks = useCMIHooks();
  const { designHooks } = CMIHooks;
  const matches = useMediaQuery('(min-width: 56.25em)');
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="md:flex block">
        <LeftMenu CMIHooks={CMIHooks} />
        <div className="w-full">
          {!matches && <TopEditor CMIHooks={CMIHooks} />}
          {designHooks.loading ? (
            <div className="w-full h-full" />
          ) : (
            <DesignArea CMIHooks={CMIHooks} />
          )}
        </div>
      </div>
    </div>
  );
}

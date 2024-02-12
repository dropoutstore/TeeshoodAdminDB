/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TopEditor } from './UI/TopEdit';
import LeftMenu from './UI/leftMenu/LeftMenu';
import useCMIHooks from './hooks';
import Center from './UI/Center';
import { Export } from './UI/Export';

export function CMI() {
  const CMIHooks = useCMIHooks();
  const {
    designHooks: { loading },
  } = CMIHooks;

  

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="md:flex block relative">
          <Export
            CMIHooks={CMIHooks}
          />
        <LeftMenu CMIHooks={CMIHooks} />
        <div className="w-full">
          <TopEditor CMIHooks={CMIHooks} />
          {loading ? (
            <div className="w-full h-full" />
          ) : (
            <Center CMIHooks={CMIHooks} />
          )}
        </div>
      </div>
    </div>
  );
}

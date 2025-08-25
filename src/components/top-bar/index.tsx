import { ThemeSwitch } from "../theme-switch"

export default function TopBar() {
  return (
    <div className="top-bar w-full fixed top-0 left-0 flex items-right justify-between p-4">
      <div className="flex items-center gap-4">
        {
          <>
            <div className="logopix relative">
              Raccoon Mortgage
            </div>
            <h1 className="text-2xl font-bold hidden sm:inline">Raccoon Mortgage</h1>
          </>
        }
      </div>
        <div className="flex items-right gap-4">
          <div>
            <ThemeSwitch />
          </div>
        </div>
    </div>
  );
}

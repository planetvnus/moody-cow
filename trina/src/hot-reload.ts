const filesInDirectory = (dir: FileSystemDirectoryEntry): Promise<File[]> =>
  new Promise((resolve) =>
    dir.createReader().readEntries((entries) =>
      Promise.all(
        entries
          .filter((e) => e.name[0] !== ".")
          .map((e) =>
            e.isDirectory
              ? filesInDirectory(e as FileSystemDirectoryEntry)
              : new Promise<File>((resolve) =>
                  (e as FileSystemFileEntry).file(resolve)
                )
          )
      )
        .then((files) => ([] as File[]).concat(...files))
        .then(resolve)
    )
  );

const timestampForFilesInDirectory = (
  dir: FileSystemDirectoryEntry
): Promise<string> =>
  filesInDirectory(dir).then((files) =>
    files.map((f) => f.name + f.lastModified).join()
  );

const reload = () => {
  chrome.runtime.reload();
};

const watchChanges = (
  dir: FileSystemDirectoryEntry,
  lastTimestamp?: string
) => {
  timestampForFilesInDirectory(dir).then((timestamp) => {
    if (!lastTimestamp || lastTimestamp === timestamp) {
      setTimeout(() => watchChanges(dir, timestamp), 1000); // retry after 1s
    } else {
      reload();
    }
  });
};

chrome.management.getSelf((self) => {
  if (self.installType === "development") {
    chrome.runtime.getPackageDirectoryEntry((dir) => watchChanges(dir));
  }
});

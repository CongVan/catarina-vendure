import { bootstrap, DefaultJobQueuePlugin } from "@vendure/core";
import { populate } from "@vendure/core/cli";

import { config } from "./vendure-config";
import { initialData } from "./initial-data";
// import path from "path";

// const productsCsvFile = path.join(__dirname, "./products.csv");

const populateConfig = {
  ...config,
  plugins: (config.plugins || []).filter(
    // Remove your JobQueuePlugin during populating to avoid
    // generating lots of unnecessary jobs as the Collections get created.
    (plugin) => plugin !== DefaultJobQueuePlugin
  ),
};

populate(
  () => bootstrap(populateConfig),
  initialData,
  undefined,
  // productsCsvFile,
  "default-channel" // optional - used to assign imported
) // entities to the specified Channel
  .then((app) => {
    return app.close();
  })
  .then(
    () => process.exit(0),
    (err) => {
      console.log(err);
      process.exit(1);
    }
  );

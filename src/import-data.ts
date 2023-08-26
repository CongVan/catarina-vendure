import {
  bootstrapWorker,
  DefaultJobQueuePlugin,
  LanguageCode,
  Logger,
} from "@vendure/core";
import { importProductsFromCsv } from "@vendure/core/cli";
import { AssetServerPlugin } from "@vendure/asset-server-plugin";
import { config } from "./vendure-config";
import path from "path";

const loggerCtx = "Import data";

runDataSync()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

async function runDataSync() {
  // This will bootstrap an instance of the Vendure Worker
  const { app } = await bootstrapWorker({
    ...config,
  });

  Logger.info("Importing...", loggerCtx);

  try {
    const channelOrToken = "default-channel";
    let channel: import("@vendure/core").Channel | undefined;
    const { ChannelService, Channel, Logger } = await import("@vendure/core");
    channel = await app.get(ChannelService).getChannelFromToken(channelOrToken);
    if (!channel) {
      Logger.warn(
        `Warning: channel with token "${channelOrToken}" was not found. Using default Channel instead.`,
        loggerCtx
      );
    }

    const importResult = await importProductsFromCsv(
      app,
      path.join(__dirname, "./products.csv"),
      LanguageCode.vi,
      channel
    );
    if (importResult.errors && importResult.errors.length) {
      const errorFile = path.join(process.cwd(), "vendure-import-error.log");
      console.log(importResult.errors);
      
      Logger.error(
        `${importResult.errors.length} errors encountered when importing product data. See: ${errorFile}`,
        loggerCtx
      );
    }

    Logger.info(`Imported ${importResult.imported} products`, loggerCtx);
  } catch (e) {
    console.log(e);

    throw e;
  }
}

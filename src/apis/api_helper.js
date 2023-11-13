import smartBrainApiClient from "../services/smart-brain-api.js";

export const put = async (url = "", data = {}) => {
  const response = await smartBrainApiClient.put(url, data);
  return response.data?.data;
};

export const post = async (url = "", data = {}) => {
  const response = await smartBrainApiClient.post(url, data);
  return response.data?.data;
};

export const findColors = async (imgUrl) => {
  const controller = new AbortController();

  try {
    const response = await smartBrainApiClient.post(
      imgUrl ? "colors" : "defaultcolors",
      {
        signal: controller.signal,
        input: imgUrl,
      }
    );

    if (response) {
      return response.data?.data?.outputs[0].data.colors.map((data) => {
        return data.raw_hex;
      });
    }
  } catch (err) {
    if (err.name === "CanceledError") return;
    throw err;
  }

  return {};
};

export const findFaces = async (imgUrl, imgElementId) => {
  const controller = new AbortController();

  try {
    const response = await smartBrainApiClient.post(
      imgUrl ? "findfaces" : "defaultfindfaces",
      {
        signal: controller.signal,
        input: imgUrl,
      }
    );

    if (response) {
      return _caculateFaceLocation(response.data, imgElementId);
    }
  } catch (err) {
    if (err.name === "CanceledError") return;
    throw err;
  }

  return {};
};

const _caculateFaceLocation = (res, imgElementId) => {
  const retRegions = [];

  const output = res?.data.outputs;

  if (output?.length > 0) {
    const regions = output[0].data.regions;
    if (regions != null) {
      regions.forEach(function (region) {
        const bounding_box = region.region_info?.bounding_box;

        if (bounding_box !== null) {
          const imgProps = _initImageProps(imgElementId);
          retRegions.push({
            leftCol: bounding_box.left_col * imgProps.width,
            topRow: bounding_box.top_row * imgProps.height,
            rightCol: imgProps.width - bounding_box.right_col * imgProps.width,
            bottomRow:
              imgProps.height - bounding_box.bottom_row * imgProps.height,
          });
        }
      });
      return retRegions;
    }
  }
  return {};
};

const _initImageProps = (imgElementId) => {
  const imgElement = document.getElementById(imgElementId);

  return {
    width: Number(imgElement?.width ?? 0),
    height: Number(imgElement?.height ?? 0),
  };
};

import clarifaiApiClient from "../services/clarifai-api-client";

const PAT = "1a95a386601f45b8a689e1f3fe42c681";
const USER_ID = "aisha_evering_3000";
const APP_ID = "SmartBrain";
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

const findFaces = async (imgUrl, imgElementId) => {
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: imgUrl,
          },
        },
      },
    ],
  });

  const _initImageProps = () => {
    const imgElement = document.getElementById(imgElementId);

    return {
      width: Number(imgElement?.width ?? 0),
      height: Number(imgElement?.height ?? 0),
    };
  };

  const _caculateFaceLocation = (data) => {
    const retRegions = [];
    const output = data?.outputs;

    if (output?.length > 0) {
      const regions = output[0].data.regions;

      if (regions != null) {
        regions.forEach(function (region) {
          const bounding_box = region.region_info?.bounding_box;

          if (bounding_box !== null) {
            const imgProps = _initImageProps();

            retRegions.push({
              leftCol: bounding_box.left_col * imgProps.width,
              topRow: bounding_box.top_row * imgProps.height,
              rightCol:
                imgProps.width - bounding_box.right_col * imgProps.width,
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

  const controller = new AbortController();

  try {
    const response = await clarifaiApiClient.post(
      "" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs",
      raw,
      {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          Authorization: "Key " + PAT,
        },
      }
    );

    if (response) {
      return _caculateFaceLocation(response?.data);
    }
  } catch (error) {
    if (error.name === "CanceledError") return;
    throw error;
  }

  return {};
};

export default findFaces;

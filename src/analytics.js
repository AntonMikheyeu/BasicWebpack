import * as $ from 'jquery';

const createAnalytics = () => {
  let count = 0;
  let isDestroied = false;

  const inc = () => count++;

  $(document).on("click", inc);

  return {
    destroy: () => {
      $(document).off("click", inc);
      isDestroied = true;
    },

    getClicks: () => {
      if (isDestroied) return `Analytics was destroyed. Count of clicks=${count}`;
      return count;
    }
  };
}

window.analytics = createAnalytics();

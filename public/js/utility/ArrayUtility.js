var ArrayUtility = {
  findSingle: function(array, keyLevel1, keyLevel2, value) {
      for (var i = 0; i < array.length; ++i) {
          if (array[i][keyLevel1][keyLevel2] == value) {
              return array[i][keyLevel1];
          }
      }
  }
};

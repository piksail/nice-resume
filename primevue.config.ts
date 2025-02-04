import { definePreset } from "@primevue/themes";
import Lara from "@primevue/themes/lara";

export default definePreset(Lara, {
  semantic: {
    primary: {
      50: "{indigo.50}",
      100: "{indigo.100}",
      200: "{indigo.200}",
      300: "{indigo.300}",
      400: "{indigo.400}",
      500: "{indigo.500}",
      600: "{indigo.600}",
      700: "{indigo.700}",
      800: "{indigo.800}",
      900: "{indigo.900}",
      950: "{indigo.950}",
    },
    colorScheme: {
      light: {
        surface: {
          0: "#ffffff",
          50: "{slate.50}",
          100: "{slate.100}",
          200: "{slate.200}",
          300: "{slate.300}",
          400: "{slate.400}",
          500: "{slate.500}",
          600: "{slate.600}",
          700: "{slate.700}",
          800: "{slate.800}",
          900: "{slate.900}",
          950: "{slate.950}",
        },
        accent: {
          50: "{pink.50}",
          100: "{pink.100}",
          200: "{pink.200}",
          300: "{pink.300}",
          400: "{pink.400}",
          500: "{pink.500}",
          600: "{pink.600}",
          700: "{pink.700}",
          800: "{pink.800}",
          900: "{pink.900}",
          950: "{pink.950}",
        },
      },
      dark: {
        surface: {
          0: "#ffffff",
          50: "{slate.50}",
          100: "{slate.100}",
          200: "{slate.200}",
          300: "{slate.300}",
          400: "{slate.400}",
          500: "{slate.500}",
          600: "{slate.600}",
          700: "{slate.700}",
          800: "{slate.800}",
          900: "{slate.900}",
          950: "{slate.950}",
        },
        accent: {
          50: "{pink.50}",
          100: "{pink.100}",
          200: "{pink.200}",
          300: "{pink.300}",
          400: "{pink.400}",
          500: "{pink.500}",
          600: "{pink.600}",
          700: "{pink.700}",
          800: "{pink.800}",
          900: "{pink.900}",
          950: "{pink.950}",
        },
      },
    },
    formField: {
      sm: {
        paddingX: "0.25rem",
        paddingY: "0.2rem",
      },
    },
  },
  components: {
    fieldset: {
      colorScheme: {
        light: {
          background: "transparent",
          legend: {
            background: "transparent",
          },
        },
        dark: {
          background: "transparent",
          legend: {
            background: "transparent",
          },
        },
      },
      border: {
        padding: 0,
      },
    },
    inputnumber: {
      button: {
        width: "1.5rem",
      },
    },
    inputtext: {
      colorScheme: {
        light: {
          root: {
            background: "{surface.0}",
            color: "{surface.700}",
          },
          subtitle: {
            color: "{surface.500}",
          },
        },
        dark: {
          root: {
            background: "{surface.900}",
            color: "{surface.0}",
          },
          subtitle: {
            color: "{surface.400}",
          },
        },
      },
    },
    panel: {
      colorScheme: {
        light: {
          background: "transparent",
          header: {
            background: "{surface.0}",
          },
        },
        dark: {
          background: "transparent",
          header: {
            background: "{surface.900}",
          },
        },
      },
      toggleable: {
        header: {
          padding: "1.125rem",
        },
      },
      border: {
        width: 0,
      },
    },
    scrollpanel: {
      bar: {
        borderRadius: "2px",
      },
      colorScheme: {
        light: {
          bar: {
            background: "{surface.0}",
          },
        },
        dark: {
          bar: {
            background: "{surface.900}",
          },
        },
      },
    },
    togglebutton: {
      sm: {
        padding: "0.2rem",
      },
    },
    toggleswitch: {
      sm: {
        witdh: "1rem",
        height: "0.75rem",
      },
    },
    toolbar: {
      colorScheme: {
        light: {
          background: "{surface.0}",
        },
        dark: {
          background: "{surface.900}",
        },
      },
      borderRadius: 0,
    },
  },
});

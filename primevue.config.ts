import { definePreset } from "@primevue/themes";
import Lara from "@primevue/themes/lara";

export default definePreset(Lara, {
  semantic: {
    primary: {
      50: "{rose.50}",
      100: "{rose.100}",
      200: "{rose.200}",
      300: "{rose.300}",
      400: "{rose.400}",
      500: "{rose.500}",
      600: "{rose.600}",
      700: "{rose.700}",
      800: "{rose.800}",
      900: "{rose.900}",
      950: "{rose.950}",
    },
    colorScheme: {
      light: {
        primary: {
          color: "{rose.600}",
          inverseColor: "#ffffff",
          hoverColor: "{rose.700}",
          activeColor: "{rose.700}",
        },
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
          50: "{rose.50}",
          100: "{rose.100}",
          200: "{rose.200}",
          300: "{rose.300}",
          400: "{rose.400}",
          500: "{rose.500}",
          600: "{rose.600}",
          700: "{rose.700}",
          800: "{rose.800}",
          900: "{rose.900}",
          950: "{rose.950}",
        },
      },
      dark: {
        primary: {
          color: "{rose.600}",
          inverseColor: "#ffffff",
          hoverColor: "{rose.700}",
          activeColor: "{rose.700}",
        },
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
          50: "{rose.50}",
          100: "{rose.100}",
          200: "{rose.200}",
          300: "{rose.300}",
          400: "{rose.400}",
          500: "{rose.500}",
          600: "{rose.600}",
          700: "{rose.700}",
          800: "{rose.800}",
          900: "{rose.900}",
          950: "{rose.950}",
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
    table: {
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
